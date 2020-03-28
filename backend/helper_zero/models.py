from django.db import models

class User(models.Model):
  name = models.CharField(max_length=120, null=True)
  phone = models.CharField(max_length=120, null=True)
  email = models.EmailField(null=True)
  zipcode = models.CharField(blank=True, null=True, max_length=120)
  lat = models.CharField(blank=True, null=True, max_length=120)
  lon = models.CharField(blank=True, null=True, max_length=120)

  def _str_(self):
    return self.name

class Organization(models.Model):
  name = models.CharField(max_length=120, null=True)
  phone = models.CharField(max_length=120, null=True)
  org_type = models.CharField(max_length=120, null=True)
  email = models.EmailField(null=True)
  is_dropoff_only = models.BooleanField(default=True)
  instructions = models.TextField(blank=True)
  point_of_contact = models.ForeignKey(
                      'User',
                      on_delete=models.SET_NULL,
                      null=True,
                     )
  zipcode = models.CharField(blank=True, null=True, max_length=120)
  lat = models.CharField(blank=True, null=True, max_length=120)
  lon = models.CharField(blank=True, null=True, max_length=120)

  def _str_(self):
    return self.name

class DonationRequest(models.Model):
  org_id = models.ForeignKey(
            'Organization',
            on_delete=models.CASCADE,
           )
  item_type = models.CharField(max_length=120)
  amount_requested = models.PositiveIntegerField()
  amount_received = models.PositiveIntegerField(default=0)

  def _str_(self):
    return self.name

class Donation(models.Model):
  user_id = models.ForeignKey(
              'User',
              on_delete=models.CASCADE,
            )
  org_id = models.ForeignKey(
            'Organization',
            on_delete=models.CASCADE,
           )
  status = models.CharField(max_length=120, null=True)
  item_type = models.CharField(max_length=120, null=True)
  amount = models.PositiveIntegerField()
  created_at = models.DateTimeField()
  donation_time = models.DateTimeField()

  def _str_(self):
    return self.name
