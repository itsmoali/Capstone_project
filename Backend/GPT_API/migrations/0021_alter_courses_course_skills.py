# Generated by Django 3.2.1 on 2024-03-29 04:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('GPT_API', '0020_auto_20240325_0251'),
    ]

    operations = [
        migrations.AlterField(
            model_name='courses',
            name='course_skills',
            field=models.CharField(default='No Skills', max_length=100),
        ),
    ]