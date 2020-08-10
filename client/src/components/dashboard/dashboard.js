import React from "react";
import $ from 'jquery';
import { Container } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import DemoVideo from "./details/demoVideo";
import Description from "./details/description";
import Facility from "./details/facility";
import Add from "./posts/addPost";
import Show from "./posts/showPost";
import DashProviderInfo from "./dashProviderInfo";
import MainDashboard from "./mainDashboard";

class Dashboard extends React.Component {

    render() {
        return (
            <div className="dashboard">
                <div className="dashboard-header">
                    <h3>Welcome: Alisa Noory</h3>
                </div>
                <div className="dashboard-nav">
                    <div className="dashboard-avatar">
                        <Avatar className="avatar">A</Avatar>
                    </div>
                </div>
                <div className="main-dashboard">
                    <Container>
                        <div className="dashboard-sidebar">
                            <div data-dashboard=".ch-dash-main-dashboard" className="dash">Dashboard</div>
                            <div className="dash-posts">Posts</div>
                            <div className="dash-show-add">
                                <div data-dashboard=".dash-add-post">Add</div>
                                <div data-dashboard=".dash-show-post">Show</div>
                            </div>
                            <div className="dash-details">Details</div>
                            <div className="dash-des">
                                <div data-dashboard=".dash-demo">Demo Video</div>
                                <div data-dashboard=".dash-describe">Description</div>
                                <div id="fac" data-dashboard=".dash-facility">Facility</div>
                            </div>
                            <div data-dashboard=".dash-provider-information" className="dash-provider-info">Provider Info</div>
                        </div>
                        <div className="dashboard-content">
                            <div className="ch-dash-main-dashboard">
                                <MainDashboard />
                            </div>
                            <div className="dash-demo">
                                <DemoVideo />
                            </div>
                            <div className="dash-describe">
                                <Description />
                            </div>
                            <div className="dash-facility">
                                <Facility />
                            </div>
                            <div className="dash-add-post">
                                <Add />
                            </div>
                            <div className="dash-show-post">
                                <Show />
                            </div>
                            <div className="dash-provider-information">
                                <DashProviderInfo />
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        );
    }
}

export default Dashboard;

$(document).ready(function () {
    $('.dash-posts').click(function () {
        $('.dash-show-add').slideToggle();
    })
    $('.dash-details').click(function () {
        $('.dash-des').slideToggle();
    })

    $('.dashboard-sidebar div').on('click', function () {
        let dashboard = $(this).data('dashboard');
        $(dashboard).show().siblings().hide();
        console.log($(this).data('dashboard'));
    })
})
