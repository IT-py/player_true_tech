from moviepy.editor import *
from moviepy.video.tools.subtitles import SubtitlesClip


userColor='red'   # пишем цвет для субтитров
userFontsize=72    # пишем размер для субтитров

# Load video and subtitles
video = VideoFileClip("video.mp4")
subtitles = SubtitlesClip("sub.srt", 
    lambda txt: TextClip(txt, fontsize=userFontsize, color=userColor, stroke_color='white', stroke_width=1, font='Arial')
)

# Set subtitles duration
subtitles = subtitles.subclip(0, video.duration)

# Set subtitles position
subtitles = subtitles.set_pos(("center", "bottom"))

# Composite video and subtitles
final_video = CompositeVideoClip([video, subtitles])

# Save final video
final_video.write_videofile("output.mp4")
