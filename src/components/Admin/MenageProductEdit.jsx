import React from "react";
import {
	FormInput,
	FormSelect,
	Buttons,
} from "./../../components";



const MenageProductEdit = (props) => {
	return (
		<div className="addNewProductForm">
			{typeof content !== "undefined" && Object.keys(product).length > 0 ? (
				<form onSubmit={handleSubmitEdit}>
					<h2>Редагувати продукт</h2>
					<FormSelect
						label="Категорія"
						options={[
							{
								value: "watches",
								name: "Годинники",
							},
							{
								value: "glasses",
								name: "Окуляри",
							},
						]}
						value={productCategory}
						handleChange={(e) => setProductCategory(e.target.value)}
					/>
					<FormInput
						Label="Назва"
						type="text"
						value={productName}
						handleChange={(e) => setProductName(e.target.value)}
					/>
					<FormInput
						Label="Головне зображення"
						type="file"
						handleChange={(e) => onHandleFile(e.target.files)}
					/>
					<FormInput
						Label="Зображення каруселі 1"
						type="file"
						handleChange={(e) => onHandleFile(e.target.files)}
					/>
					<FormInput
						Label="Зображення каруселі 2"
						type="file"
						handleChange={(e) => onHandleFile(e.target.files)}
					/>
					<FormInput
						Label="Зображення каруселі 3"
						type="file"
						handleChange={(e) => onHandleFile(e.target.files)}
					/>
					<FormInput
						Label="Ціна"
						type="number"
						min="0.00"
						max="10000.00"
						step="0.01"
						handleChange={(e) => setPrice(e.target.value)}
					/>
					<CKEditor onChange={(evt) => setProductDesc(evt.editor.getData())} />
					<Buttons type="submit" style="btn-read">
						Редагувати продукт
					</Buttons>
				</form>
			) : (
				<form onSubmit={handleSubmit}>
					<h2>Добавити новий продукт</h2>
					<FormSelect
						label="Категорія"
						options={[
							{
								value: "watches",
								name: "Годинники",
							},
							{
								value: "glasses",
								name: "Окуляри",
							},
						]}
						value={productCategory}
						handleChange={(e) => setProductCategory(e.target.value)}
					/>
					<FormInput
						Label="Назва"
						type="text"
						handleChange={(e) => setProductName(e.target.value)}
					/>
					<FormInput
						Label="Головне зображення"
						type="file"
						handleChange={(e) => onHandleFile(e.target.files)}
					/>
					<FormInput
						Label="Зображення каруселі 1"
						type="file"
						handleChange={(e) => onHandleFile(e.target.files)}
					/>
					<FormInput
						Label="Зображення каруселі 2"
						type="file"
						handleChange={(e) => onHandleFile(e.target.files)}
					/>
					<FormInput
						Label="Зображення каруселі 3"
						type="file"
						handleChange={(e) => onHandleFile(e.target.files)}
					/>
					<FormInput
						Label="Ціна"
						type="number"
						min="0.00"
						max="10000.00"
						step="0.01"
						handleChange={(e) => setPrice(e.target.value)}
					/>
					<CKEditor onChange={(evt) => setProductDesc(evt.editor.getData())} />
					<Buttons type="submit" style="btn-read">
						Добавити новий продукт
					</Buttons>
				</form>
			)}
		</div>
	);
};

export default MenageProductEdit;
