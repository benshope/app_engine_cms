#!/usr/bin/env python

__author__  = 'Ben Shope'
__website__ = 'www.benshope.com'

import os, sys
# Third party libraries path must be fixed before importing webapp2
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'boilerplate/external'))

import webapp2

import routes
from boilerplate import routes as boilerplate_routes
from admin import routes as admin_routes
from boilerplate import config as boilerplate_config
import config
from boilerplate.lib.basehandler import handle_error

webapp2_config = boilerplate_config.config
webapp2_config.update(config.config)

app = webapp2.WSGIApplication(debug = os.environ['SERVER_SOFTWARE'].startswith('Dev'), config=webapp2_config)

for status_int in app.config['error_templates']:
    app.error_handlers[status_int] = handle_error

routes.add_routes(app)
boilerplate_routes.add_routes(app)
admin_routes.add_routes(app)


