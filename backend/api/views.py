from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from api.serializer import MyTokenObtainPairSerializer, RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
import json
from django.contrib.auth import get_user_model

# Create your views here.


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/',
        '/api/test/'
    ]
    return Response(routes)

@api_view(['PUT'])
@permission_classes([AllowAny])
def updatePassword(request):
   User = get_user_model()
   try:
        body = request.body.decode('utf-8')
        data = json.loads(body)
        
        if 'username' not in data or 'new_password' not in data:
            return Response("Invalid JSON data", status.HTTP_400_BAD_REQUEST)
        
        username = data.get('username')
        new_password = data.get('new_password')
        
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response("No existe un usuario con ese username", status=status.HTTP_404_NOT_FOUND)
        
        if new_password:

            user.set_password(new_password)
            user.save()

            return Response({'response': "Se ha restablecido la contraseña correctamente"}, status=status.HTTP_200_OK)
        return Response("Algo ha salido mal, contacte con el administrador", status=status.HTTP_500_INTERNAL_SERVER_ERROR)
   except:
        return Response("Invalid JSON data", status.HTTP_400_BAD_REQUEST)
       

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congratulation {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        try:
            body = request.body.decode('utf-8')
            data = json.loads(body)
            if 'text' not in data:
                return Response("Invalid JSON data", status.HTTP_400_BAD_REQUEST)
            text = data.get('text')
            data = f'Congratulation your API just responded to POST request with text: {text}'
            return Response({'response': data}, status=status.HTTP_200_OK)
        except json.JSONDecodeError:
            return Response("Invalid JSON data", status.HTTP_400_BAD_REQUEST)
        except Exception:
            return Response("Algo ha salido mal, verifique con su administrador.", status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response("Invalid JSON data", status.HTTP_400_BAD_REQUEST)