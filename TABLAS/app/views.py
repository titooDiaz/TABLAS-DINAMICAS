from django.http.response import JsonResponse
from django.shortcuts import render
from .models import Programmer
from django.urls import reverse
from django.http import HttpResponseRedirect
from django.views.generic import View

def index(request):
    return render(request, 'index.html')


def list_programmers(_request):
    programmers = list(Programmer.objects.values())
    data = {'programmers': programmers}
    return JsonResponse(data)

def create_programmers(_request):
    for i in range(10):
        Programmer.objects.create(
            name=f"programador {i}",
            country="ABC",
            birthday="2000-01-01",
            score=i
        )
    
    # Redirige al usuario a la URL 'create'1
    return HttpResponseRedirect(reverse('index'))