import webscraper, parsedata

if __name__ == '__main__':
    # Call the scrape method from webscraper.py
    webscraper.scrape()

    # Create the csv file
    csvfile = open('output.csv', 'w')
    parsedata.parse(csvfile)
