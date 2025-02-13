from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializer import *
from rest_framework import generics

@api_view(['GET'])
def apiOverview(request):

    api_urls = {
        'All Securities' : '/get-securities/',
        'Security' : '/get-security/<str:pk>/',
        'Add Security' : '/add-security/',
        'Update Security' : '/update-security/<str:pk>',
        'Get Daily Prices' : '/get-dailyprices/<str:pk>'
    }
    return Response(api_urls)



@api_view(['GET'])
def getSecurities(request):
    securities = Security.objects.all()
    serializer = SecuritySerializer(securities, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getSecurity(request, pk):
    securities = Security.objects.get(security_id=pk)
    serializer = SecuritySerializer(securities, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def addSecurity(request):
    serializer = SecuritySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def updateSecurity(request, pk):
    security = Security.objects.get(security_id=pk)
    serializer = SecuritySerializer(instance=security, data=request.data)

    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteSecurity(request, pk):
    security = Security.objects.get(security_id=pk)
    security.delete()

    return Response("Security Successfully Deleted")


@api_view(['GET'])
def getDailyPrices(request, pk):
    # security = Security.objects.get(security_id = pk)
    daily_prices = DailyPrice.objects.filter(security_id = pk) #can chain filter/exclude
    serializer = DailyPriceSerializer(daily_prices, many=True)
    return Response(serializer.data)




# class DailyPriceView(APIView):
#     def get(self, request):
#         output = [ {
#             "dp_id": output.dp_id,
#             "security": output.security,
#             "dp_date": output.dp_date,
#             "dp_created_date": output.dp_created_date,
#             "dp_last_updated": output.dp_last_updated,
#             "dp_open": output.dp_open,
#             "dp_high": output.dp_high,
#             "dp_low": output.dp_low,
#             "dp_close": output.dp_close,
#             "dp_adj_close": output.dp_adj_close,
#             "dp_volume": output.dp_volume}
#             for output in DailyPrice.objects.all()]
#         return Response(output)
    
#     def post(self, request):
#         serializer = DailyPriceSerializer(data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             serializer.save()
#             return Response(serializer.data)

# class DailyPriceItemView(generics.ListCreateAPIView):
#     queryset = DailyPrice.objects.all()
#     serializer_class = DailyPriceSerializer

#     def get_queryset(self):
#         queryset = super().get_queryset()

#         # name = self.request.query_params.get('name')
#         # if name:
#         #     queryset = queryset.filter(employee=name)
        
#         return queryset
    
# class SecurityItemView(generics.ListCreateAPIView):
#     queryset = Security.objects.all()
#     serializer_class = SecuritySerializer

#     def get_queryset(self):
#         # handle other parameters here and filter the queryset if required
#         return super().get_queryset()
    

# # Create your views here.
# def index(request):
#     securities = Security.objects.all()
#     for security in securities:
#         print(security.security_name)
#     return HttpResponse("Hello, world. You're at the index.")

