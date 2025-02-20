# Generated by Django 5.1.3 on 2025-02-20 01:44

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_authgroup_authgrouppermissions_authpermission_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserFavouriteSecurities',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('security', models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='api.security')),
                ('user', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'user_favourite_securities',
                'managed': True,
                'unique_together': {('user', 'security')},
            },
        ),
    ]
