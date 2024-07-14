import {
  faFileArrowUp,
  faFileArrowDown,
  faFileZipper,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLiveQuery } from 'dexie-react-hooks';

import db from '../db';

import type { problem } from '../shared';

function DownloadProblems() {
  const problems = useLiveQuery(() => db.problems.toArray()) ?? [];
  const problemsOrder = (
    useLiveQuery(() => db.miscellaneous.get({ name: 'problemsOrder' })) ?? {
      value: [],
    }
  ).value as string[];
  const orderedProblems = problemsOrder.map((id) =>
    problems.find((problem) => problem.id === id),
  ) as problem[];

  return (
    <>
      <h2 className="h4 mb-4dot5">Download problems</h2>
      <div className="mb-4dot5">
        <h4 className="h5">Backup in JSON format</h4>
        <p className="mb-2 text-secondary fw-medium">
          For later editing or continuing on another computer
        </p>
        <ul className="ps-4" style={{ listStyle: 'none' }}>
          <li>
            <button className="btn btn-link text-decoration-none fw-medium">
              <FontAwesomeIcon
                icon={faFileArrowUp}
                className="me-3"
                style={{ fontSize: '1.25rem' }}
              />
              Upload
            </button>
          </li>
          <li>
            <button className="btn btn-link text-decoration-none fw-medium">
              <FontAwesomeIcon
                icon={faFileArrowDown}
                className="me-3"
                style={{ fontSize: '1.25rem' }}
              />
              Download
            </button>
          </li>
        </ul>
      </div>
      <div className="mb-4 dot5">
        <h4 className="h5">Export as BOCA-compatible ZIP files</h4>
        <p className="mb-2 text-secondary fw-medium">
          Problems packages ready to be used in programming competitions
        </p>
        <div className="ps-4">
          <p className="mb-1">
            <button
              className="btn btn-link text-decoration-none fw-medium"
              onClick={() => {
                console.log('all');
              }}
            >
              <FontAwesomeIcon
                icon={faFileZipper}
                className="me-3"
                style={{ fontSize: '1.25rem' }}
              />
              Download All
            </button>
            or download each problem individually
          </p>
          <ul
            className="ps-0 d-flex flex-wrap align-items-center list-separators"
            style={{ listStyle: 'none' }}
          >
            {orderedProblems.map((problem) => (
              <li key={problem.id}>
                <button
                  className="btn btn-link text-decoration-none fw-medium"
                  onClick={() => {
                    console.log(problem);
                  }}
                >
                  {problem.fullName}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default DownloadProblems;
