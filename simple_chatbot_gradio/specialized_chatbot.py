import openai
import gradio
import secret_key

openai.api_key = secret_key.API_TOKEN

messages = [{"role": "system", "content": "You are an englich teacher. Provide your response for a first grader."}]

def CustomChatGPT(user_input):
    messages.append({"role": "user", "content": user_input})
    response = openai.ChatCompletion.create(
        model = "gpt-3.5-turbo",
        messages = messages
    )
    ChatGPT_reply = response["choices"][0]["message"]["content"]
    messages.append({"role": "assistant", "content": ChatGPT_reply})
    return ChatGPT_reply

demo = gradio.Interface(fn=CustomChatGPT, inputs = "text", outputs = "text", title = "English Teacher")

demo.launch()
# demo.launch(share=True)