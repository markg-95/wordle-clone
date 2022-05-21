from flask import Flask, render_template
import json
import random

app = Flask(__name__)

@app.route('/')
def hello_world():
    with open("wordle_words.txt") as f:
        string = f.read()
        string=string.replace("[","")
        string=string.replace("]","")
        string=string.replace("\'","")
        string=string.replace(" ","")
        words = string.split(",")
        num_words = len(words)
        random_index = random.randint(0,num_words-1)
        random_word = words[random_index]
        return render_template('index.html', secret_word=random_word)