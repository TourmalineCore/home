import os
import boto3
from datetime import datetime


def main():

    create_db_backup(os.getenv('HOME_CMS_DATABASE_HOST'),
                     os.getenv('HOME_CMS_DATABASE_USERNAME'),
                     os.getenv('HOME_CMS_DATABASE_PASSWORD'),
                     os.getenv('HOME_CMS_DATABASE_NAME'),
                     os.getenv('HOME_CMS_DB_BACKUPS_FILENAME_PREFIX'))

    create_db_backup(os.getenv('HOME_URL_SHORTENER_DATABASE_HOST'),
                     os.getenv('HOME_URL_SHORTENER_DATABASE_USERNAME'),
                     os.getenv('HOME_URL_SHORTENER_DATABASE_PASSWORD'),
                     os.getenv('HOME_URL_SHORTENER_DATABASE_NAME'),
                     os.getenv('HOME_URL_SHORTENER_DB_BACKUPS_FILENAME_PREFIX'))

def upload_to_s3(backup_filename):

    s3 = boto3.client(
        's3',
        aws_access_key_id=os.getenv('DESTINATION_DB_AWS_ACCESS_KEY_ID'),
        aws_secret_access_key=os.getenv('DESTINATION_DB_AWS_SECRET_ACCESS_KEY'),
        endpoint_url=os.getenv('DESTINATION_DB_AWS_ENDPOINT'),
    )

    bucket_name = os.getenv('DESTINATION_DB_AWS_BUCKET_NAME')


    with open(backup_filename, "rb") as data:
        s3.upload_fileobj(data, bucket_name, backup_filename)

def create_db_backup(database_host, database_username, database_password, database_name, backup_filename_prefix):
    backup_filename = f'{backup_filename_prefix}' + '-' + datetime.strftime(datetime.utcnow(), "%Y-%m-%dT%H-%M-%S") + '.backup'

    os.system(f'PGPASSWORD={database_password} pg_dump -h {database_host} -U {database_username} --encoding UTF8 --format plain {database_name} > {backup_filename}')

    if os.path.exists(backup_filename):
        upload_to_s3(backup_filename)
        os.remove(backup_filename)

    else:
        raise Exception("No such file: '%s'" %(backup_filename))

if __name__ == '__main__':

    main()