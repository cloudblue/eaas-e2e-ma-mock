# -*- coding: utf-8 -*-
#
# Copyright (c) 2022, CloudBlue LLC
# All rights reserved.
#
import asyncio
import logging
import time

from connect.eaas.core.decorators import (
    account_settings_page,
    admin_pages,
    customer_pages,
    devops_pages,
    module_pages,
    router,
    web_app,
)
from connect.eaas.core.extension import WebApplicationBase

from e2e.mixins import MyMixin


class MiddlewareTimingClass:
    """
    Middleware that logs the calls that are longer than the specified
     threshold in seconds. Also the logging level could be configured.
    """

    _log_fn = {
        logging.CRITICAL: 'critical',
        logging.ERROR: 'error',
        logging.WARNING: 'warning',
        logging.INFO: 'info',
        logging.DEBUG: 'debug',
    }

    def __init__(self, app, log_level=logging.INFO, threshold=None):
        logger = logging.getLogger('eaas.webapp')
        self._log = getattr(logger, self._log_fn[log_level])
        self.app = app
        self.log_level = log_level
        self.threshold = threshold

    async def __call__(self, scope, receive, send):
        start_time = time.time()
        await self.app(scope, receive, send)
        elapsed = time.time() - start_time
        if self.threshold is None or elapsed >= self.threshold:
            self._log(
                f'MIDDLEWARE: Request processed. Elapsed time {elapsed:.6f}s',
            )


@web_app(router)
@account_settings_page('Chart settings', '/static/settings.html')
@module_pages(
    'Bar chart',
    '/static/index.html',
    children=[
        {
            'label': 'Line chart',
            'url': '/static/line.html',
        },
    ],
)
@admin_pages(
    [
        {
            'label': 'Admin',
            'url': '/static/settings.html',
        },
    ],
)
@customer_pages(
    [
        {
            'label': 'Customer 1',
            'url': '/static/customer.html',
            'icon': '/static/connect_icon.png',
        },
    ],
)
@devops_pages(
    [
        {
            'label': 'Tab1',
            'url': '/static/tab1.html',
        },
        {
            'label': 'Tab2',
            'url': '/static/tab2.html',
        },
    ],
)
class E2EWebApplication(WebApplicationBase, MyMixin):

    @classmethod
    async def on_startup(cls, logger, config):
        logger.info('Executing WA hook on startup...')

    @classmethod
    async def on_shutdown(cls, logger, config):
        logger.info('Executing WA hook on shutdown...')
        await asyncio.sleep(0.5)
        logger.info('Execution done')

    @classmethod
    def get_middlewares(cls):
        return [
            MiddlewareTimingClass,
        ]
