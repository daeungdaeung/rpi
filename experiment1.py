# Importing the Bluetooth Socket library
import bluetooth
# Importing the GPIO library to use the GPIO pins of Raspberry pi
import RPi.GPIO as GPIO
led_pin = 21    # Initializing pin 40 for led
GPIO.setmode(GPIO.BCM)    # Using BCM numbering
GPIO.setup(led_pin, GPIO.OUT)    # Declaring the pin 40 as output pin
host = ""
port = 1    # Raspberry Pi uses port 1 for Bluetooth Communication
# Creaitng Socket Bluetooth RFCOMM communication
server = bluetooth.BluetoothSocket(bluetooth.RFCOMM)
print('Bluetooth Socket Created')
try:
    server.bind((host, port))
    print("Bluetooth Binding Completed")
except:
    print("Bluetooth Binding Failed")
server.listen(1) # One connection at a time
# Server accepts the clients request and assigns a mac address.
client, address = server.accept()
print("Connected To", address)
print("Client:", client)

try:
    while True:
        # Receivng the data.
        data_list = []
        sentence = ' '

        for i in range(0, 8):
            data = client.recv(1024)
            data_list.append(data)
            sentence = ''.join(data_list)
            print(data_list, sentence)

            if len(sentence) == 1 and sentence == 't':
                pass
            elif len(sentence) == 2 and sentence == 'tu':
                pass
            elif len(sentence) == 3 and sentence == 'tur':
                pass
            elif len(sentence) == 4 and sentence == 'turn':
                pass
            elif len(sentence) == 5 and sentence == 'turn ':
                pass
            elif len(sentence) == 6 and sentence == 'turn o':
                pass
            elif len(sentence) == 7 and sentence == 'turn on':
                GPIO.output(led_pin, True)
                print("Light On ")
                break
            elif len(sentence) == 7 and sentence == 'turn of':
                pass
            elif len(sentence) == 8 and sentence == 'turn off':
                GPIO.output(led_pin, False)
                print("Light Off ")
                break
            else: break

        if sentence == "quit ": # If you want to use quit value you have to remove Last Space.
            GPIO.output(led_pin, False)
            print("Light OFF ")
            print("quit")
            break

        print("Command end")
        #print("Speak 'turn on' or 'turn off' or 'quit'.")
        # Sending the data.
        #client.send(send_sentence)
except:
    # Making all the output pins LOW
    GPIO.cleanup()
    # Closing the client and server connection
    client.close()
    server.close()
