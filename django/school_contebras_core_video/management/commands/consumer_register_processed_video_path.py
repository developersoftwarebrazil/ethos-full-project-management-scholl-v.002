from django.core.management import BaseCommand
from school_contebras_core_video.rabbitmq import create_rabbitmq_connection
from school_contebras_core_video.services import create_video_service_factory
from kombu import Exchange, Queue
import time

class Command(BaseCommand):
    help = 'Register processed video path'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Starting consumer...'))

        exchange = Exchange('conversion_exchange', type='direct', auto_delete=True)
        queue = Queue('finish-conversion', exchange, routing_key='finish-conversion')

        while True:
            try:
                with create_rabbitmq_connection() as conn:
                    self.stdout.write(self.style.SUCCESS('Connected to RabbitMQ, consuming messages...'))
                    with conn.Consumer(queue, callbacks=[self.process_message]):
                        while True:
                            try:
                                conn.drain_events(timeout=2)
                            except TimeoutError:
                                continue

            except Exception as e:
                self.stdout.write(self.style.WARNING(f'⚠️ RabbitMQ unavailable: {e}. Retrying in 5s...'))
                time.sleep(5)
                continue

    def process_message(self, body, message):
        self.stdout.write(self.style.SUCCESS(f'Processing video_id={body["video_id"]}'))
        create_video_service_factory().register_processed_video_path(body['video_id'], body['path'])
        message.ack()
