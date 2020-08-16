import React from 'react';
import { Container } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCalendarAlt, faPaperPlane, faImage } from '@fortawesome/free-solid-svg-icons';
import Avatar from '@material-ui/core/Avatar';
import Rating from '@material-ui/lab/Rating';
import { ProvidedRequiredArgumentsOnDirectivesRule } from 'graphql/validation/rules/ProvidedRequiredArgumentsRule';

class ProviderReviews extends React.Component {
    componentDidMount() {
        var inputs = document.querySelectorAll('.inputfile');
        Array.prototype.forEach.call(inputs, function (input) {
            var label = input.nextElementSibling,
                labelVal = label.innerHTML;

            input.addEventListener('change', function (e) {
                var fileName = '';
                if (this.files && this.files.length > 1)
                    fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
                else
                    fileName = e.target.value.split('\\').pop();

                if (fileName)
                    label.querySelector('span').innerHTML = fileName;
                else
                    label.innerHTML = labelVal;
            });

            // Firefox bug fix
            input.addEventListener('focus', function () { input.classList.add('has-focus'); });
            input.addEventListener('blur', function () { input.classList.remove('has-focus'); });
        });
    }
    render() {
        return (
            <div>
                <Container>
                    <div className="reviews-head">
                        <h2> Reviews</h2>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                    <div className="reviews-comments">
                        <div className="comments">
                            <div className="img-comment">
                                <Avatar className="avatar">D</Avatar>
                            </div>
                            <div className="text-comment">
                                <h3>Doly Test</h3>
                                <Rating readOnly />
                                <p>" Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. "</p>
                                <div className="reviews-img">
                                    <img src={require(`../../images/1.jpg`)} />
                                    <img src={require(`../../images/1.jpg`)} />
                                    <img src={require(`../../images/1.jpg`)} />
                                </div>
                                <hr />
                                <span><FontAwesomeIcon icon={faCalendarAlt} /> 12 April 2018</span>
                            </div>
                        </div>
                    </div>
                    <div className="add-reviews-head">
                        <h3>Add Review</h3>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                    <div className="reviews-rating">
                        <Rating
                            defaultValue={2}
                            precision={0.5}
                        />
                    </div>
                    <div className="add-reviews">
                        <textarea placeholder="Enter Your Reviews"></textarea>
                        <div class="box">
                            <input type="file" name="file-1[]" id="file-1" class="inputfile inputfile-1" data-multiple-caption="{count} files selected" multiple />
                            <label for="file-1"><FontAwesomeIcon icon={faImage} /> <span className="add-photos">Add Photos</span></label>
                        </div>
                        <button>Submit Reviews <FontAwesomeIcon icon={faPaperPlane} /></button>
                    </div>
                </Container>
            </div>
        );
    }
}

export default ProviderReviews;