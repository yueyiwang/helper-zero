from django.db import models

# Create your models here.

class Organization(models.Model):
    name = models.TextField(max_length=120)
    description = models.TextField()

    def _str_(self):
        return self.name