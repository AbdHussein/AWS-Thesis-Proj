import React from 'react';

class Add extends React.Component {
   state = {
            text: "",
          image: ""
        };
      
    
      handelChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
      }
    render() {
        return (
            <div className="dash-add">
                <form>
                    <textarea  className="post-area"name="text" cols="80" rows="30" value={this.state.text} onChange={this.handelChange.bind(this)}></textarea>
                    <input type="file" name="image"  value={this.state.image} onChange={this.handelChange.bind(this)}/>
                     <button>Post</button>
                </form>
            </div>
        )
    }
}

export default Add;