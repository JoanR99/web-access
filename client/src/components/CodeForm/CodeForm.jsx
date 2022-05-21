import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	useEvaluationResults,
	useEvaluationApi,
} from '../../context/evaluation/EvaluationContext';

const CodeForm = () => {
	const [code, setCode] = useState('');
	const navigate = useNavigate();
	const { useEvaluation } = useEvaluationApi();
	const { isSuccess, isError, isLoading } = useEvaluationResults();

	useEffect(() => {
		if (isSuccess) {
			navigate('/evaluation/results');
		}
	}, [isSuccess]);

	const submitHandler = (e) => {
		e.preventDefault();
		useEvaluation('code', code);
	};

	return (
		<>
			<form onSubmit={submitHandler} className="form">
				<h2 className="heading-2 heading-2--primary">Evaluate By Code</h2>
				<div className="form-group">
					<label htmlFor="code">Code</label>
					<textarea
						rows={5}
						name="code"
						id="code"
						value={code}
						onChange={(e) => setCode(e.target.value)}
						placeholder="<html> </html>"
					></textarea>
				</div>
				<button type="submit" className="btn">
					Evaluate
				</button>
			</form>
			{isLoading && <h3>Loading...</h3>}
			{isError && <h3>Sorry, something went wrong.</h3>}
		</>
	);
};

export default CodeForm;