# Generated by Django 3.2.1 on 2024-03-25 02:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('GPT_API', '0019_auto_20240325_0250'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usercourses',
            name='completed',
            field=models.JSONField(default=dict, verbose_name='{}'),
        ),
        migrations.AlterField(
            model_name='usercourses',
            name='module_completions',
            field=models.JSONField(default=dict, verbose_name='{}'),
        ),
    ]
