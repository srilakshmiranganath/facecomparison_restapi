from django.db import models

class File(models.Model):
  name = models.CharField(max_length=20)
  file = models.FileField(blank=False, null=False, upload_to='media/')