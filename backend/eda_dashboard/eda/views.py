from django.shortcuts import render
import os
import pandas as pd
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

DATA_PATH = os.path.join(os.path.dirname(__file__), 'data/D0_Round2.csv')
df = pd.read_csv(DATA_PATH)

df.columns = df.columns.str.strip() 

df.dropna(subset=['Brand', 'PackType', 'PPG', 'Channel', 'Year', 'Date', 'SalesValue', 'Volume'], inplace=True)
df['Year'] = df['Year'].astype(str)
df['Date'] = pd.to_datetime(df['Date'], errors='coerce')
df = df[df['Date'].notna()]
df['Month'] = df['Date'].dt.to_period('M').astype(str)


class FilteredDataAPI(APIView):
    def get(self, request):
        filters = {
            'Brand': request.GET.get('brand'),
            'PackType': request.GET.get('pack_type'),
            'PPG': request.GET.get('ppg'),
            'Channel': request.GET.get('channel'),
            'Year': request.GET.get('year'),
        }

        filtered_df = df.copy()
        for col, val in filters.items():
            if val and val.upper() != "ALL":
                filtered_df = filtered_df[filtered_df[col] == val]

        sales_by_year = (
            filtered_df.groupby("Year")["SalesValue"]
            .sum()
            .sort_index()
            .round(2)
            .to_dict()
        )
        volume_by_year = (
            filtered_df.groupby("Year")["Volume"]
            .sum()
            .sort_index()
            .round(2)
            .to_dict()
        )
        return Response({
            "sales_by_year": sales_by_year,
            "volume_by_year": volume_by_year
        })


class YearWiseValueAPI(APIView):
    def get(self, request):
        try:
            # Group by Year and PPG
            grouped = df.groupby(['Year', 'PPG'])['SalesValue'].sum().reset_index()

            # Pivot the table so each row is a year, and PPGs are columns
            pivot_df = grouped.pivot(index='Year', columns='PPG', values='SalesValue').fillna(0).round(2)

            # Convert to dictionary format expected by frontend
            result = pivot_df.reset_index().to_dict(orient='records')

            return Response(result)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class YearlyTrendAPI(APIView):
    def get(self, request):
        try:
            # Group by Month and sum SalesValue
            monthly_trend = (
                df.groupby("Month")["SalesValue"]
                .sum()
                .reset_index()
                .rename(columns={"SalesValue": "value", "Month": "month"})
            )

            # Round values and convert to dictionary format
            monthly_trend["value"] = monthly_trend["value"].round(2)
            result = monthly_trend.to_dict(orient="records")

            return Response(result)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class MarketShareAPI(APIView):
    def get(self, request):
        dimension = request.GET.get("dimension", "SalesValue")  # SalesValue or Volume
        if dimension not in ["SalesValue", "Volume"]:
            return Response({"error": "Invalid dimension"}, status=status.HTTP_400_BAD_REQUEST)

        share_df = (
            df.groupby("Brand")[dimension]
            .sum()
            .reset_index()
        )
        total = share_df[dimension].sum()
        share_df["percentage"] = (share_df[dimension] / total * 100).round(2)

        return Response(share_df.to_dict(orient="records"))


class FilterOptionsAPI(APIView):
    def get(self, request):
        def safe_unique(column):
            return sorted(df[column].dropna().astype(str).unique().tolist())

        return Response({
            "brands": safe_unique("Brand"),
            "pack_types": safe_unique("PackType"),
            "ppgs": safe_unique("PPG"),
            "channels": safe_unique("Channel"),
            "years": safe_unique("Year")
        })
