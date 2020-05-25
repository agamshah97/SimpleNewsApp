from flask import Flask, jsonify, request, url_for
from newsapi import NewsApiClient, newsapi_exception
#from flask_cors import CORS
import re

# EB looks for an 'application' callable by default.
application = Flask(__name__)
#cors = CORS(application)

@application.route('/')
def homepage():
    return application.send_static_file("index.html")

@application.route('/mystyle.css')
def cssfile():
    return application.send_static_file("mystyle.css")

@application.route('/button-transition.js')
def button_transition_file():
    return application.send_static_file("button-transition.js")

@application.route('/forms.js')
def formfile():
    return application.send_static_file("forms.js")

@application.route('/headlines.js')
def headlinesfile():
    return application.send_static_file("headlines.js")

@application.route('/wordcloud.js')
def wordcloudfile():
    return application.send_static_file("wordcloud.js")

@application.route('/request.js')
def requestsfile():
    return application.send_static_file("request.js")

@application.route('/cardbehavior.js')
def card_behavior_file():
    return application.send_static_file("cardbehavior.js")

@application.route('/cross.svg')
def imagefile():
    return application.send_static_file("cross.svg")

newsapi = NewsApiClient(api_key='5d31417f34094327aca4b0ea777d2381')

# some bits of text for the page.
header_text = '''
    <html>\n<head> <title>EB Flask Test</title> </head>\n<body>'''
instructions = '''
    <p><em>Hint</em>: This is a RESTful web service! Append a username
    to the URL (for example: <code>/Thelonious</code>) to say hello to
    someone specific.</p>\n'''
home_link = '<p><a href="/">Back</a></p>\n'
footer_text = '</body>\n</html>'

def topheadlines():
    top_hlines = newsapi.get_top_headlines(language='en', page_size=30)
    articles = top_hlines.get('articles')
    filtered_articles = []
    c = 0
    for article in articles:
        if(article.get('source') and article.get('author') and article.get('title') and article.get('description') and article.get('url') and article.get('urlToImage') and article.get('publishedAt')):
            source = article.get('source')
            if(source.get('id') and source.get('name')):
                filtered_articles.append(article)
                c = c + 1
        if c == 5 :
            break
    #print(filtered_articles)
    return jsonify({'status':'ok', 'articles' : filtered_articles})

def foxheadlines():
    top_hlines = newsapi.get_top_headlines(sources='fox-news', language='en', page_size=30)
    articles = top_hlines.get('articles')
    filtered_articles = []
    c = 0
    for article in articles:
        if(article.get('source') and article.get('author') and article.get('title') and article.get('description') and article.get('url') and article.get('urlToImage') and article.get('publishedAt')):
            source = article.get('source')
            if(source.get('id') and source.get('name')):
                filtered_articles.append(article)
                c = c + 1
        if c == 4 :
            break
    #print(filtered_articles)
    return jsonify({'status':'ok', 'articles' : filtered_articles})

def cnnheadlines():
    top_hlines = newsapi.get_top_headlines(sources='cnn', language='en', page_size=30)
    articles = top_hlines.get('articles')
    filtered_articles = []
    c = 0
    for article in articles:
        if(article.get('source') and article.get('author') and article.get('title') and article.get('description') and article.get('url') and article.get('urlToImage') and article.get('publishedAt')):
            source = article.get('source')
            if(source.get('id') and source.get('name')):
                filtered_articles.append(article)
                c = c + 1
        if c == 4 :
            break
    #print(filtered_articles)
    return jsonify({'status':'ok', 'articles' : filtered_articles})

def wordcloud():
    stop_words = []
    with open('stopwords_en.txt') as file:
        for line in file:
            stop_words.append(line.strip())
    #print(stop_words)

    puncs = ['[', '{', '|', '-', ',', ';', '!', ']', '}', '(',')', '.', '/', ':'] 

    top_hlines = newsapi.get_top_headlines(language='en', page_size=100)
    word_count = {}
    articles = top_hlines.get('articles')
    for article in articles:
        if article.get('title'):
            words = article.get('title').split(" ")
            for word in words:
                word = word.lower()
                word = re.sub('[,.!?:;-]', '', word)
                if word == "":
                    continue
                if word not in stop_words and word not in puncs:
                    if word_count.get(word):
                        word_count[word] = word_count[word] + 1
                    else:
                        word_count[word] = 1

    sorted_word_counts = [{'word': k, 'size': v} for k, v in sorted(word_count.items(), key=lambda item: -item[1])]
    print(sorted_word_counts[0:30])
    return jsonify({'status':'ok', 'words' : sorted_word_counts[0:30], 'max':sorted_word_counts[0]['size'], 'min':sorted_word_counts[-1]['size']})


@application.route('/getsources', methods=['POST', 'GET'])
def getsources():
    category = request.form['category']
    #print(category)
    if category == 'all':
        sources = newsapi.get_sources(language = 'en', country = 'us')
    else:
        sources = newsapi.get_sources(category = category, language = 'en', country = 'us')
    #print(sources)
    return jsonify(sources)

@application.route('/geteverything', methods=['POST', 'GET'])
def geteverything():
    keyword = request.form['keyword']
    from_date = request.form['from']
    to_date = request.form['to']
    source = request.form['source']

    '''top_hlines = newsapi.get_everything(q='bitcoin',
                                      sources='bbc-news,the-verge',
                                      domains='bbc.co.uk,techcrunch.com',
                                      from_param='2020-02-07',
                                      to='2020-03-05',
                                      language='en',
                                      sort_by='relevancy',
                                      page=2)
                                      '''
    try:
        if source == 'all':
            articles_data = newsapi.get_everything(q = keyword, from_param = from_date, to = to_date, language = 'en', page_size = 30, sort_by='publishedAt')
        else:
            articles_data = newsapi.get_everything(q = keyword, from_param = from_date, to = to_date, language = 'en', page_size = 30, sources = source, sort_by='publishedAt')
    except Exception as e:
        raise e

    articles = articles_data.get('articles')
    filtered_articles = []
    c = 0
    for article in articles:
        if(article.get('source') and article.get('author') and article.get('title') and article.get('description') and article.get('url') and article.get('urlToImage') and article.get('publishedAt')):
            source = article.get('source')
            if(source.get('name')):
                filtered_articles.append(article)
                c = c + 1
        if c == 15 :
            break
    #print(filtered_articles)
    return jsonify({'status' : 'ok', 'articles' : filtered_articles})


application.add_url_rule('/topheadlines', 'top_headlines', topheadlines)

application.add_url_rule('/headlines_cnn', 'cnn_headlines', cnnheadlines)

application.add_url_rule('/headlines_fox', 'fox_headlines', foxheadlines)

application.add_url_rule('/wordcloud', 'wordcloud', wordcloud)


@application.errorhandler(newsapi_exception.NewsAPIException)
def handleException(data):
    #print("Error Handler Called")
    status = data.get_status()
    code = data.get_code()
    message = data.get_message() 
    return jsonify({'status':status, 'code':code, 'message':message})

# run the app.
if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    application.debug = True
    application.run()