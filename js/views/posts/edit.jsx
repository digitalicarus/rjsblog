import React     from 'react';
import Reflux    from 'reflux';
import Quill     from 'quill';

import BasicInput from 'appRoot/components/basicInput';

export default React.createClass({
	componentDidMount: function () {
		this.quill = new Quill(this.refs.editor.getDOMNode(), { 
			theme: 'snow', 
			modules: {
				'link-tooltip': true,
				'image-tooltip': true,
				'toolbar': {
					container: this.refs.toolbar.getDOMNode()
				}
			}
		});
	},
	submit: function (e) {
		console.log(this.quill.getHTML().replace(/data-reactid="[^"]+"/g, ''));
		e.preventDefault();
	},
	// form parts of component is always the same so render won't diff
	render: function () {
		return (
			<form className="post-edit" onSubmit={this.submit}>
				<fieldset>
					<BasicInput type="text"  name="title" placeholder="post title" />
					<hr/>
					<br/>
					<div className="rich-editor">
						<div ref="toolbar">
							<span className="ql-format-group">
								<select title="Font" className="ql-font" defaultValue="">
									<option value="sans-serif" >Sans Serif</option>
									<option value="serif">Serif</option>
									<option value="monospace">Monospace</option>
								</select>
								<select className="ql-size">
									<option value="10px">Small</option>
									<option value="13px">Normal</option>
									<option value="18px">Large</option>
									<option value="32px">Huge</option>
								</select>  
							</span>
							<span className="ql-format-group">
								<span className="ql-bold ql-format-button"></span>
								<span className="ql-format-separator"></span>
								<span className="ql-italic ql-format-button"></span>
								<span className="ql-format-separator"></span>
								<span className="ql-underline ql-format-button"></span>
								<span className="ql-format-separator"></span>
							</span>
							<span className="ql-format-group">
								<select title="Text Color" className="ql-color">
									<option value="rgb(0, 0, 0)" label="rgb(0, 0, 0)"></option>
									<option value="rgb(230, 0, 0)" label="rgb(230, 0, 0)"></option>
									<option value="rgb(255, 153, 0)" label="rgb(255, 153, 0)"></option>
									<option value="rgb(255, 255, 0)" label="rgb(255, 255, 0)"></option>
									<option value="rgb(0, 138, 0)" label="rgb(0, 138, 0)"></option>
									<option value="rgb(0, 102, 204)" label="rgb(0, 102, 204)"></option>
									<option value="rgb(153, 51, 255)" label="rgb(153, 51, 255)"></option>
									<option value="rgb(255, 255, 255)" label="rgb(255, 255, 255)"></option>
									<option value="rgb(250, 204, 204)" label="rgb(250, 204, 204)"></option>
									<option value="rgb(255, 235, 204)" label="rgb(255, 235, 204)"></option>
									<option value="rgb(255, 255, 204)" label="rgb(255, 255, 204)"></option>
									<option value="rgb(204, 232, 204)" label="rgb(204, 232, 204)"></option>
									<option value="rgb(204, 224, 245)" label="rgb(204, 224, 245)"></option>
									<option value="rgb(235, 214, 255)" label="rgb(235, 214, 255)"></option>
									<option value="rgb(187, 187, 187)" label="rgb(187, 187, 187)"></option>
									<option value="rgb(240, 102, 102)" label="rgb(240, 102, 102)"></option>
									<option value="rgb(255, 194, 102)" label="rgb(255, 194, 102)"></option>
									<option value="rgb(255, 255, 102)" label="rgb(255, 255, 102)"></option>
									<option value="rgb(102, 185, 102)" label="rgb(102, 185, 102)"></option>
									<option value="rgb(102, 163, 224)" label="rgb(102, 163, 224)"></option>
									<option value="rgb(194, 133, 255)" label="rgb(194, 133, 255)"></option>
									<option value="rgb(136, 136, 136)" label="rgb(136, 136, 136)"></option>
									<option value="rgb(161, 0, 0)" label="rgb(161, 0, 0)"></option>
									<option value="rgb(178, 107, 0)" label="rgb(178, 107, 0)"></option>
									<option value="rgb(178, 178, 0)" label="rgb(178, 178, 0)"></option>
									<option value="rgb(0, 97, 0)" label="rgb(0, 97, 0)"></option>
									<option value="rgb(0, 71, 178)" label="rgb(0, 71, 178)"></option>
									<option value="rgb(107, 36, 178)" label="rgb(107, 36, 178)"></option>
									<option value="rgb(68, 68, 68)" label="rgb(68, 68, 68)"></option>
									<option value="rgb(92, 0, 0)" label="rgb(92, 0, 0)"></option>
									<option value="rgb(102, 61, 0)" label="rgb(102, 61, 0)"></option>
									<option value="rgb(102, 102, 0)" label="rgb(102, 102, 0)"></option>
									<option value="rgb(0, 55, 0)" label="rgb(0, 55, 0)"></option>
									<option value="rgb(0, 41, 102)" label="rgb(0, 41, 102)"></option>
									<option value="rgb(61, 20, 102)" label="rgb(61, 20, 102)"></option>
								</select>
								<select title="Background Color" className="ql-background">
									<option value="rgb(0, 0, 0)" label="rgb(0, 0, 0)"></option>
									<option value="rgb(230, 0, 0)" label="rgb(230, 0, 0)"></option>
									<option value="rgb(255, 153, 0)" label="rgb(255, 153, 0)"></option>
									<option value="rgb(255, 255, 0)" label="rgb(255, 255, 0)"></option>
									<option value="rgb(0, 138, 0)" label="rgb(0, 138, 0)"></option>
									<option value="rgb(0, 102, 204)" label="rgb(0, 102, 204)"></option>
									<option value="rgb(153, 51, 255)" label="rgb(153, 51, 255)"></option>
									<option value="rgb(255, 255, 255)" label="rgb(255, 255, 255)"></option>
									<option value="rgb(250, 204, 204)" label="rgb(250, 204, 204)"></option>
									<option value="rgb(255, 235, 204)" label="rgb(255, 235, 204)"></option>
									<option value="rgb(255, 255, 204)" label="rgb(255, 255, 204)"></option>
									<option value="rgb(204, 232, 204)" label="rgb(204, 232, 204)"></option>
									<option value="rgb(204, 224, 245)" label="rgb(204, 224, 245)"></option>
									<option value="rgb(235, 214, 255)" label="rgb(235, 214, 255)"></option>
									<option value="rgb(187, 187, 187)" label="rgb(187, 187, 187)"></option>
									<option value="rgb(240, 102, 102)" label="rgb(240, 102, 102)"></option>
									<option value="rgb(255, 194, 102)" label="rgb(255, 194, 102)"></option>
									<option value="rgb(255, 255, 102)" label="rgb(255, 255, 102)"></option>
									<option value="rgb(102, 185, 102)" label="rgb(102, 185, 102)"></option>
									<option value="rgb(102, 163, 224)" label="rgb(102, 163, 224)"></option>
									<option value="rgb(194, 133, 255)" label="rgb(194, 133, 255)"></option>
									<option value="rgb(136, 136, 136)" label="rgb(136, 136, 136)"></option>
									<option value="rgb(161, 0, 0)" label="rgb(161, 0, 0)"></option>
									<option value="rgb(178, 107, 0)" label="rgb(178, 107, 0)"></option>
									<option value="rgb(178, 178, 0)" label="rgb(178, 178, 0)"></option>
									<option value="rgb(0, 97, 0)" label="rgb(0, 97, 0)"></option>
									<option value="rgb(0, 71, 178)" label="rgb(0, 71, 178)"></option>
									<option value="rgb(107, 36, 178)" label="rgb(107, 36, 178)"></option>
									<option value="rgb(68, 68, 68)" label="rgb(68, 68, 68)"></option>
									<option value="rgb(92, 0, 0)" label="rgb(92, 0, 0)"></option>
									<option value="rgb(102, 61, 0)" label="rgb(102, 61, 0)"></option>
									<option value="rgb(102, 102, 0)" label="rgb(102, 102, 0)"></option>
									<option value="rgb(0, 55, 0)" label="rgb(0, 55, 0)"></option>
									<option value="rgb(0, 41, 102)" label="rgb(0, 41, 102)"></option>
									<option value="rgb(61, 20, 102)" label="rgb(61, 20, 102)"></option>
								</select>
							</span>
							<span className="ql-format-group">
								<span title="List" className="ql-format-button ql-list"></span>
								<span className="ql-format-separator"></span>
								<span title="Bullet" className="ql-format-button ql-bullet"></span>
								<span className="ql-format-separator"></span>
								<select title="Text Alignment" className="ql-align">
									<option value="left" label="Left"></option>
									<option value="center" label="Center"></option>
									<option value="right" label="Right"></option>
									<option value="justify" label="Justify"></option>
								</select>
							</span>
							<span className="ql-format-group">
								<span className="ql-link ql-format-button"></span>
								<span className="ql-format-separator"></span>
								<span className="ql-image ql-format-button"></span>
							</span>
						</div>
						<div ref="editor">
							<div>Hello World!</div>
							<div><b>This</b> is my story...</div>
							<div><br/></div>
						</div>
					</div>
					<BasicInput name="tags" type="text" placeholder="tags" helptext="comma separated" />
					<button type="submit">Post</button>
				</fieldset>
			</form>
		);
	}
});
 
