# Generated by Django 3.2.1 on 2024-03-23 04:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('GPT_API', '0009_courses_course_summary'),
    ]

    operations = [
        migrations.AlterField(
            model_name='courses',
            name='course_summary',
            field=models.CharField(default='This is a course', max_length=100),
        ),
    ]
