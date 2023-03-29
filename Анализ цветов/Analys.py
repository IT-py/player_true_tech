import cv2

# Открываем видеофайл для чтения
cap = cv2.VideoCapture('video.mp4')

# Открываем файл для записи процентного соотношения цветов
with open('colors.txt', 'w') as f:
    f.write('Красный, Зеленый, Синий\n')

    while(cap.isOpened()):
        # Считываем кадр из видео
        ret, frame = cap.read()

        if ret == True:
            # Рассчитываем процентное соотношение красного, зеленого и синего цветов
            b, g, r = cv2.mean(frame)[:3]
            total_pixels = frame.shape[0] * frame.shape[1]
            b_percent = round(b / total_pixels * 100, 2)
            g_percent = round(g / total_pixels * 100, 2)
            r_percent = round(r / total_pixels * 100, 2)

            # Записываем процентное соотношение цветов в файл
            f.write(f'{r_percent}%, {g_percent}%, {b_percent}%\n')

            # Отображаем текущий кадр
            cv2.imshow('frame',frame)

            # Нажимаем 'q' для выхода из цикла
            if cv2.waitKey(25) & 0xFF == ord('q'):
                break
        else:
            break

# Очищаем память и закрываем окна
cap.release()
cv2.destroyAllWindows()
