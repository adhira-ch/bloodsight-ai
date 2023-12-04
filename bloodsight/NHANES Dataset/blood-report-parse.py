import openai
import PyPDF2

api_key = ""

def parse_pdf_text(pdf_path):
    text = ''
    with open(pdf_path, 'rb') as pdf_file:
        pdf_reader = PyPDF2.PdfFileReader(pdf_file)
        for page_num in range(pdf_reader.numPages):
            page = pdf_reader.getPage(page_num)
            text += page.extractText()
    return text

def extract_info_from_text(report_text):
    prompt = f"Extract the relevant information from the following blood report:\n{report_text}\n\nExtracted information:"
    
    response = openai.Completion.create(
        engine="gpt-4-32k",
        prompt=prompt,
        max_tokens=32000,
        api_key=api_key
    )
    
    extracted_info = response.choices[0].text.strip()
    return extracted_info

path1 = "files/blood_report_test.pdf"
text = parse_pdf_text(path1)
info = extract_info_from_text(text)