'use client';

import { Fragment, useEffect, useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Container, Col, Row } from 'react-bootstrap';

import { StatRightTopIcon } from "widgets";
import { ActiveProjects, Teams, TasksPerformance } from "sub-components";
import ProjectsStatsData from "data/dashboard/ProjectsStatsData";

const Home = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/authentication/sign-in');
    } else {
      setIsAuthorized(true);
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <span className="text-muted">Checking authentication...</span>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <Fragment>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12} md={12} xs={12}>
            <div className="d-flex justify-content-between align-items-center">
              <div className="mb-2 mb-lg-0">
                <h3 className="mb-0 text-white">Projects</h3>
              </div>
              <div>
                <Link href="#" className="btn btn-white">Create New Project</Link>
              </div>
            </div>
          </Col>

          {ProjectsStatsData.map((item, index) => (
            <Col xl={3} lg={6} md={12} xs={12} className="mt-6" key={index}>
              <StatRightTopIcon info={item} />
            </Col>
          ))}
        </Row>

        <ActiveProjects />

        <Row className="my-6">
          <Col xl={4} lg={12} md={12} xs={12} className="mb-6 mb-xl-0">
            <TasksPerformance />
          </Col>

          <Col xl={8} lg={12} md={12} xs={12}>
            <Teams />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Home;
