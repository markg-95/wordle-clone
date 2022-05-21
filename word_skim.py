with open('word_dump.txt') as f:
    lines = f.read()
    words = lines.split(",")
    five_letter_words=[]
    c=0
    for word in words:
        word=word.replace("\"","")
        word=word.replace("\'","\"")
        if(len(word)==5):
            five_letter_words.append(word)
            c=c+1
with open('wordle_words.txt', 'w') as f:
    f.write(str(five_letter_words))
