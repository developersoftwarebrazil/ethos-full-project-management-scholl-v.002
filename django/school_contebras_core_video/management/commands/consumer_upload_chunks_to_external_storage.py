from django.core.management import BaseCommand
from school_contebras_core_video.rabbitmq import create_rabbitmq_connection
from school_contebras_core_video.services import create_video_service_factory
from kombu import Exchange, Queue
import time

class Command(BaseCommand):
    help = 'Upload chunks to external storage'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Starting consumer...'))

        exchange = Exchange('conversion_exchange', type='direct', auto_delete=True)
        queue = Queue(
            'chunks',
            exchange,
            routing_key='chunks',
            durable=True,
            auto_delete=False
        )

        processed_messages = 0

        def process_message(body, message):
            nonlocal processed_messages
            processed_messages += 1
            # Obter contagem de mensagens apenas para mostrar progresso
            total_messages = getattr(queue, 'total_messages', 0)
            percentage = (processed_messages / total_messages) * 100 if total_messages > 0 else 100
            self.stdout.write(self.style.SUCCESS(f'Processing video_id={body["video_id"]} ({percentage:.2f}% done)'))
            create_video_service_factory().upload_chunks_to_external_storage(body['video_id'])
            message.ack()

        while True:
            try:
                with create_rabbitmq_connection() as conn:
                    self.stdout.write(self.style.SUCCESS('✅ Connected to RabbitMQ, consuming messages...'))

                    # Declara a fila para garantir que existe
                    queue.maybe_bind(conn)
                    queue.declare()

                    # Atualiza total de mensagens no atributo da fila
                    try:
                        queue_info = conn.default_channel.queue_declare(queue.name, passive=True)
                        queue.total_messages = queue_info.message_count
                    except Exception:
                        queue.total_messages = 0

                    with conn.Consumer(queue, callbacks=[process_message]):
                        while True:
                            try:
                                conn.drain_events(timeout=2)
                            except TimeoutError:
                                continue

            except Exception as e:
                self.stdout.write(self.style.WARNING(f'⚠️ RabbitMQ unavailable: {e}. Retrying in 5s...'))
                time.sleep(5)
