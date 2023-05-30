from selenium import webdriver
from bs4 import BeautifulSoup

def scrape_economic_calendar():
    # Configure Selenium WebDriver (make sure to provide the path to your chromedriver executable)
    driver = webdriver.Chrome('/path/to/chromedriver')

    # Specify the URL of the economic calendar page
    url = 'https://www.investing.com/economic-calendar/'

    # Open the URL using Selenium WebDriver
    driver.get(url)

    # Get the page source after the JavaScript has rendered the dynamic content
    page_source = driver.page_source

    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(page_source, 'html.parser')

    # Find the container div that holds the table
    table = soup.find('table', {'id': 'economicCalendarData'})


    # Extract the data from the table
    events = []
    rows = table.find_all('tr')
    print(rows)
    # for row in rows[1:]:  # Skip the table header row
    #     cells = row.find_all('td')
    #     time = cells[0].text.strip()
    #     currency = cells[1].text.strip()
    #     event = cells[2].text.strip()
    #     actual = cells[3].text.strip()
    #     forecast = cells[4].text.strip()
    #     previous = cells[5].text.strip()
    #     events.append({
    #         'Time': time,
    #         'Currency': currency,
    #         'Event': event,
    #         'Actual': actual,
    #         'Forecast': forecast,
    #         'Previous': previous
    #     })
    #
    # # Quit the WebDriver
    driver.quit()
    #
    # return events

if __name__ == '__main__':
    # Call the function to scrape the economic calendar
    scrape_economic_calendar()

    # # Print the scraped data
    # for event in calendar:
    #     print(event)

