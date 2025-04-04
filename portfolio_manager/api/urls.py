from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
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
    path("get-portfolios/", views.getPortfolios, name="getPortfolios"),
    path("add-portfolio/<str:portfolio_name>/", views.addPortfolio, name="addPortfolio"),
    path("delete-portfolio/<str:portfolio_id>/", views.deletePortfolio, name="deletePortfolio"),
    path("edit-portfolio/<str:portfolio_id>/<str:portfolio_name>/", views.editPortfolio, name="editPortfolio"),
    path("get-portfoliosecurities/<str:portfolio_id>/", views.getPortfolioSecurities, name="getPortfolioSecurities"),
    path("set-portfoliosecurity/<str:portfolio_id>/<str:security_id>/", views.setPortfolioSecurity, name="setPortfolioSecurity"),
    path("get-favourites/", views.getFavourites, name="getFavourites"),
    path("set-favourite/<str:security_id>/", views.setFavourite, name="setFavourite"),
    path("signup/", views.signup, name="signup"),
    path("token/", TokenObtainPairView.as_view(), name='tokenObtainPair'),
    path("token/refresh/", TokenRefreshView.as_view(), name='tokenRefresh')
    
    
    
    # path("login/", views.loginView, name="loginView"),
    # path("logout/", views.logoutView, name="logoutView"),
    # path("session/", views.sessionView, name="sessionView"),
    # path("identify-user/", views.identifyUserView, name="identifyUserView"),
]