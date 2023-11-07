import openai
import gradio
import secret_key

openai.api_key = secret_key.API_TOKEN


demo = gradio.Blocks()

messages_eng_teacher = [{"role": "system", "content": "You are an englich teacher. Provide your response for a first grader. Respond in English and Persian."}]

def EnglishTeacher(user_input):
    messages_eng_teacher.append({"role": "user", "content": user_input})
    response = openai.ChatCompletion.create(
        model = "gpt-3.5-turbo",
        messages = messages_eng_teacher
    )
    ChatGPT_reply = response["choices"][0]["message"]["content"]
    messages_eng_teacher.append({"role": "assistant", "content": ChatGPT_reply})
    return ChatGPT_reply

messages_dictation = [{"role": "system", "content": "You are an englich teacher. Provide a dictation with 40 words in one paragraph. This should be for a first grader. Respond in English."}]

def Dictation(user_input):
    messages_dictation.append({"role": "user", "content": user_input})
    response = openai.ChatCompletion.create(
        model = "gpt-3.5-turbo",
        messages = messages_dictation
    )
    ChatGPT_Dict = response["choices"][0]["message"]["content"]
    messages_dictation.append({"role": "assistant", "content": ChatGPT_Dict})
    return ChatGPT_Dict

with demo:
    gradio.Markdown("English Teacher")
    with gradio.Tabs():
        with gradio.TabItem("Chat"):
            with gradio.Row():
                chat_input = gradio.Textbox()
                chat_output = gradio.Textbox()
            chat_button = gradio.Button("Start")
        with gradio.TabItem("Dictation"):
            with gradio.Row():
                dict_input = gradio.Textbox()
                dict_output = gradio.Textbox()
            dict_button = gradio.Button("Start")

    chat_button.click(EnglishTeacher, inputs=chat_input, outputs=chat_output)
    dict_button.click(Dictation, inputs=dict_input, outputs=dict_output)


#interface 1
# englishteacher = gradio.Interface(fn=EnglishTeacher, inputs = "text", outputs = "text", title = "English Teacher")


# #interface 2
# dictation = gradio.Interface(fn=Dictation, inputs = "text", outputs = "text", title = "Dictation")

# # demo = gr.TabbedInterface([EnglishTeacher, Dictation], ["English Tea", "What to do"])
# demo = gradio.TabbedInterface([EnglishTeacher, Dictation])

demo.launch()
# demo.launch(share=True)