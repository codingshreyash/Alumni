from mjml import mjml2html
from pathlib import Path

src_dir = Path(__file__).parent / "src"
build_dir = Path(__file__).parent / "build"
build_dir.mkdir(exist_ok=True)

for file in src_dir.glob("*.mjml"):
    print(file)
    with open(file, 'r') as mjml_file:
        mjml_content = mjml_file.read()
        html_content = mjml2html(mjml_content)
        with open(build_dir / file.name.replace(".mjml", ".html"), 'w') as html_file:
            html_file.write(html_content)
