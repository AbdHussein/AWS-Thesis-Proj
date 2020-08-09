import React from 'react';

class Add extends React.Component {
    render() {
        return (
            <div className="dash-add">
                <input type="file" name="image" />
                <textarea name="post" cols="30" rows="10"></textarea>
            </div>
        )
    }
}

export default Add;