# Generated by Django 3.0.4 on 2020-03-28 07:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('helper_zero', '0004_auto_20200328_0446'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='lat_lon',
            new_name='lat',
        ),
        migrations.AddField(
            model_name='user',
            name='long',
            field=models.CharField(blank=True, max_length=120, null=True),
        ),
    ]
