from django.urls import path

from . import views

urlpatterns = [
    path("", views.apiOverview, name="apiOverview"),
    path("get-securities/", views.getSecurities, name="getSecurities"),
    path("get-security/<str:pk>/", views.getSecurity, name="getSecurity"),
    path("add-security/", views.addSecurity, name="addSecurity"),
    path("update-security/<str:pk>/", views.updateSecurity, name="updateSecurity"),
    # path("delete-security/<str:pk>/", views.deleteSecurity, name="deleteSecurity"),
    path("get-dailyprices/<str:pk>/", views.getDailyPrices, name="getDailyPrices"),
    path("get-period-dailyprices/<str:pk>/<str:start>/<str:end>/", views.getPeriodDailyPrices, name="getPeriodDailyPrices"),
]