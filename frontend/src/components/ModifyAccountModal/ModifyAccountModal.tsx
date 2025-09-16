import { useState } from 'react';
import Modal from '../../components/Modal/Modal.tsx';
import type { User } from '../../types/index';
import { fetchApi } from '../../utils/api.js';
import React from 'react';
import { useParams } from 'react-router';

import './ModifyAccountModal.scss';

interface ModifyAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    formData: User | null;
    setFormData: React.Dispatch<React.SetStateAction<User | null>>;
    setUser: React.Dispatch<React.SetStateAction<User | null>>
    setActiveModal:React.Dispatch<React.SetStateAction<string | null>>
}

export default function ModifyAccountModal({
    isOpen,
    onClose,
    formData,
    setFormData,
    setUser,
    setActiveModal
}: ModifyAccountModalProps) {

    const [_success, setSuccess] = useState(false);
    const [_loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const token = localStorage.getItem("token");
    const { id } = useParams();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!formData) return;
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData) return;
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        if (formData.password.length < 8) {
            setError("Le mot de passe doit contenir au moins 8 caractères.");
            return;
        }

        setLoading(true);

        try {
            if (!token) throw new Error("Utilisateur non authentifié");
            const response = await fetchApi(`users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, confirmPassword: undefined }),
            });

            if (!response) {
                setError(response.error || "Erreur lors de la modification.");
            } else {
                setSuccess(true);
                setUser({ ...formData });
                setActiveModal(null);
            }
        } catch (err) {
            console.error("Erreur lors de la modification :", err);
            setError('Erreur réseau ou serveur.');
        } finally {
            setLoading(false);
        }
    };
    return (<Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit} className="modifyAccountForm">
            <label htmlFor="lastname">Nom</label>
            <input
                type="text"
                name="lastname"
                placeholder="Nom*"
                value={formData?.lastname}
                onChange={handleChange}
                required
            />
            <label htmlFor="firstname">Prénom</label>
            <input
                type="text"
                name="firstname"
                placeholder="Prénom*"
                value={formData?.firstname}
                onChange={handleChange}
                required
            />
            <label htmlFor="date_of_birth">Date de naissance</label>
            <input
                type="text"
                name="date_of_birth"
                value={formData?.date_of_birth}
                placeholder="Date de naissance (JJ/MM/AAAA)*"
                onChange={handleChange}
                required
            />
            <label htmlFor="email">Email</label>
            <input
                type="email"
                name="email"
                value={formData?.email}
                placeholder="Email*"
                onChange={handleChange}
                required
            />
            <label htmlFor="zip_code">Code Postal</label>
            <input
                type="text"
                name="zip_code"
                value={formData?.zip_code}
                placeholder="Code postal*"
                onChange={handleChange}
                required
            />
            <label htmlFor="city">Ville</label>
            <input
                type="text"
                name="city"
                value={formData?.city}
                placeholder="Ville*"
                onChange={handleChange}
                required
            />
            <label htmlFor="description">Description</label>
            <input
                type="text"
                name="description"
                value={formData?.description}
                placeholder="Description"
                onChange={handleChange}
                required
            />
            <label htmlFor="password">Mot de passe</label>
            <input
                type="password"
                name="password"
                placeholder="Mot de passe (min 8 caractères)*"
                onChange={handleChange}
                required
            />
            <label htmlFor="confirmPassword">Confirmez votre mot de passe</label>
            <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmer le mot de passe*"
                onChange={handleChange}
                required
            />
            <input type="submit" value="Valider" className=""></input>
            {error && <p className="error-msg">{error}</p>}
        </form>
    </Modal>
    )
}