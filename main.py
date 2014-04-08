import webapp2
import cgi
import urllib
import json
from google.appengine.ext import ndb
from google.appengine.api import users
from google.appengine.api import mail

class Storage(ndb.Model):
    content  = ndb.TextProperty()

class Database(webapp2.RequestHandler):
    def get(self):
        entity = Storage.get_by_id('content')
        self.response.out.write(entity.content)
    def post(self):
        content = json.loads(self.request.body).get('content')
        entity = Storage.get_or_insert('content')
        entity.content = content
        entity.put()

class Login(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        if user:
            self.response.write('You are logged in as ' + user.nickname())
        else:
            self.redirect(users.create_login_url(self.request.uri))

class Contact(webapp2.RequestHandler):
    def post(self):
        json_data = json.loads(self.request.body)
        data = [json_data.get(x) for x in ['name', 'email', 'message']]
        mail.send_mail(sender='nimajnebs@gmail.com', 
            to='nimajnebs@gmail.com', 
            subject='Contact Form Message', 
            body='From: {} \nEmail: {} \nMessage: {}'.format(*data))
        self.response.out.write('Thanks!  Your message has been sent.')

app = webapp2.WSGIApplication([
  ('/aelogin', Login),
  ('/aecontact', Contact),
  ('/aedatabase', Database)
])