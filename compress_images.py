from PIL import Image
import os

assets_dir = r"D:\ai产品项目内容\圣诞树div\dist\assets"
total_saved = 0

for fname in os.listdir(assets_dir):
    if not fname.endswith('.png'):
        continue
    fpath = os.path.join(assets_dir, fname)
    orig_size = os.path.getsize(fpath)
    
    # 大于200KB的图片压缩
    if orig_size < 200 * 1024:
        continue
    
    img = Image.open(fpath)
    # 限制最大尺寸为800px
    max_dim = 800
    if img.width > max_dim or img.height > max_dim:
        ratio = min(max_dim / img.width, max_dim / img.height)
        new_size = (int(img.width * ratio), int(img.height * ratio))
        img = img.resize(new_size, Image.LANCZOS)
    
    # 保存为优化的PNG
    img.save(fpath, 'PNG', optimize=True)
    new_size = os.path.getsize(fpath)
    saved = orig_size - new_size
    total_saved += saved
    print(f"{fname}: {orig_size//1024}KB -> {new_size//1024}KB (saved {saved//1024}KB)")

print(f"\nTotal saved: {total_saved//1024}KB")
