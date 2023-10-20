from django.db import models

class Programmer(models.Model):
    name = models.CharField(max_length=50)
    country = models.CharField(max_length=3)
    birthday = models.DateField()
    score = models.PositiveSmallIntegerField()

    class Meta:
        db_table = 'programmer'
