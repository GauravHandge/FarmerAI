import os
import io
import base64
from PIL import Image
from typing import Dict, Any

class VisionAnalyzer:
    """Python Real-Time Vision Perception Engine using PIL & Image Feature Analysis"""
    
    def analyze_image_bytes(self, base64_str: str) -> Dict[str, Any]:
        try:
            if "," in base64_str:
                base64_str = base64_str.split(",", 1)[1]
                
            image_data = base64.b64decode(base64_str)
            img = Image.open(io.BytesIO(image_data)).convert("RGB")
            
            width, height = img.size
            aspect_ratio = width / float(height)
            
            # Resize for fast feature extraction
            img_small = img.resize((100, 100))
            pixels = list(img_small.getdata())
            total_px = len(pixels)
            
            # Analyze color channel distributions
            blue_purple_cnt = 0
            green_turf_cnt = 0
            red_orange_cnt = 0
            white_bright_cnt = 0
            dark_cnt = 0
            skin_tint_cnt = 0
            
            # Sample upper half vs lower half for stadium/structure patterns
            upper_blue_purple = 0
            lower_green = 0
            
            for idx, (r, g, b) in enumerate(pixels):
                is_upper = (idx // 100) < 50
                
                # Brightness
                brightness = (r + g + b) / 3.0
                if brightness > 210:
                    white_bright_cnt += 1
                elif brightness < 40:
                    dark_cnt += 1
                
                # Blue / Purple / Stadium seating / Blue skies
                if b > r + 15 and b > g + 10:
                    blue_purple_cnt += 1
                    if is_upper:
                        upper_blue_purple += 1
                elif r > 150 and b > 120 and g < 100: # Purple
                    blue_purple_cnt += 1
                    if is_upper:
                        upper_blue_purple += 1
                
                # Green grass / foliage
                if g > r + 10 and g > b + 10:
                    green_turf_cnt += 1
                    if not is_upper:
                        lower_green += 1
                
                # Red / Orange fruits or jersey
                if r > g + 40 and r > b + 40:
                    red_orange_cnt += 1
                    
                # Human skin tints
                if r > 140 and g > 100 and b > 80 and r > g and (r - g) < 70 and g > b:
                    skin_tint_cnt += 1

            blue_ratio = blue_purple_cnt / float(total_px)
            green_ratio = green_turf_cnt / float(total_px)
            white_ratio = white_bright_cnt / float(total_px)
            skin_ratio = skin_tint_cnt / float(total_px)
            
            upper_blue_pct = upper_blue_purple / 5000.0
            lower_green_pct = lower_green / 5000.0
            
            # Classification Logic
            # 1. Cricket Stadium / Sports Arena (Upper blue/purple seating + lower green pitch + wide aspect ratio)
            if (upper_blue_pct > 0.15 and lower_green_pct > 0.15) or (blue_ratio > 0.20 and green_ratio > 0.15 and aspect_ratio > 1.2):
                category = "stadium_sports"
                description = "Cricket Stadium / Sports Arena with seating stands, floodlight towers, and green playing field pitch."
            # 2. Person / Athlete (Skin tone presence + centered human framing)
            elif skin_ratio > 0.12 or (white_ratio > 0.25 and skin_ratio > 0.05):
                category = "person_athlete"
                description = "Person / Athlete wearing sports uniform/apparel."
            # 3. Agricultural Crop / Leaf (Dominant green foliage across entire image)
            elif green_ratio > 0.40:
                category = "agricultural_crop"
                description = "Agricultural Crop Leaf / Vegetation with green foliage."
            # 4. Pet / Livestock Animal (Mixed natural tones)
            elif aspect_ratio > 1.1 and (green_ratio > 0.20 or white_ratio > 0.15):
                category = "outdoor_animal"
                description = "Animal (Livestock/Pet) outdoors in an open field."
            else:
                category = "general_image"
                description = "General photo."

            return {
                "success": True,
                "category": category,
                "description": description,
                "aspect_ratio": round(aspect_ratio, 2),
                "width": width,
                "height": height
            }
        except Exception as e:
            return {
                "success": False,
                "category": "unknown",
                "description": "Uploaded image file.",
                "error": str(e)
            }

vision_analyzer = VisionAnalyzer()
