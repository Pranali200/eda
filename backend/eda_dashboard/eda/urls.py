from django.urls import path
from .views import (
    FilteredDataAPI,
    YearlyTrendAPI,
    MarketShareAPI,
    YearWiseValueAPI,
    FilterOptionsAPI,
)

urlpatterns = [
    path('filtered-data/', FilteredDataAPI.as_view(), name='filtered-data'),
    path('yearly-trend/', YearlyTrendAPI.as_view(), name='yearly-trend'),
    path('market-share/', MarketShareAPI.as_view(), name='market-share'),
    path('yearwise-value/', YearWiseValueAPI.as_view(), name='yearwise-value'),
    path('filter-options/', FilterOptionsAPI.as_view(), name='filter-options'),
]
