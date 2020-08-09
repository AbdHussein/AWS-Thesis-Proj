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
                    <input type="file" name="image"  value={this.state.image} onChange={this.handelChange.bind(this)}/>
                    <textarea name="text" cols="30" rows="10" value={this.state.text} onChange={this.handelChange.bind(this)}></textarea>
                    <button>Post</button>
                </form>
            </div>
        )
    }
}

export default Add;