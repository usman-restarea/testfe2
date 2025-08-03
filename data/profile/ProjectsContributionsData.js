'use client';

import { useEffect, useState } from 'react';

const ProjectsContributions = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = 'your_access_token';
      const result = await getProjectsContributionsData(token);
      setData(result); 
    };

    fetchData();
  }, []);

  if (!data.length) return <div>Loading...</div>;

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <h2>{item.projectName}</h2>
          <p>{item.description}</p>
          <img src={item.brandLogo} alt="logo" width={60} />
          <div>
            {item.members.map((member, index) => (
              <img
                key={index}
                src={member.image}
                alt={`member-${index}`}
                width={30}
                style={{ borderRadius: '50%' }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsContributions;
