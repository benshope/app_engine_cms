import json

self.response.headers['Content-Type'] = 'application/json'   
obj = {
    'success': 'some var', 
    'payload': 'some var',
  } 
self.response.out.write(json.dumps(obj))




application = webapp.WSGIApplication(...) # Or something else if you're not using webapp

def main():
  run_wsgi_app(application)

if __name__ == '__main__':
  main()