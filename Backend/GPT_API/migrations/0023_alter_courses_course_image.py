# Generated by Django 3.2.1 on 2024-04-11 18:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('GPT_API', '0022_alter_courses_course_skills'),
    ]

    operations = [
        migrations.AlterField(
            model_name='courses',
            name='course_image',
            field=models.CharField(default='No Image', max_length=10000),
        ),
    ]
