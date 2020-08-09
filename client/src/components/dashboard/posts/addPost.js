import React from 'react';

class Add extends React.Component {
    render() {
        return (
            <div className="dash-add">
                <form>
                    <input type="file" name="image" />
                    <textarea name="post" cols="30" rows="10"></textarea>
                    <button>Post</button>
                </form>
            </div>
        )
    }
}

export default Add;