# Generated by Django 5.1.3 on 2025-03-06 05:58

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_userfavouritesecurities'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='userfavouritesecurities',
            name='security',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='api.security'),
        ),
        migrations.AlterField(
            model_name='userfavouritesecurities',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
