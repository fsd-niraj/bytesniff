package cert

import (
	"crypto/rand"
	"crypto/rsa"
	"crypto/x509"
	"crypto/x509/pkix"
	"encoding/pem"
	"errors"
	"math/big"
	"os"
	"time"
)

var (
	rootCert *x509.Certificate
	rootKey  *rsa.PrivateKey
)

const (
	RootCAPath     = "certs/rootCA.pem"
	RootKeyPath    = "certs/rootCA.key"
	RootCommonName = "ByteSniff Root CA"
)

func InitCA() error {
	if rootCert != nil && rootKey != nil {
		return nil
	}

	if certExist() {
		return loadCA()
	}
	return createCA()
}

func certExist() bool {
	_, certErr := os.Stat(RootCAPath)
	_, keyErr := os.Stat(RootKeyPath)
	return !os.IsNotExist(certErr) && !os.IsNotExist(keyErr)
}

func createCA() error {
	key, err := rsa.GenerateKey(rand.Reader, 4096)

	if err != nil {
		return nil
	}

	template := &x509.Certificate{
		SerialNumber: big.NewInt(time.Now().Unix()),
		Subject: pkix.Name{
			CommonName:   RootCommonName,
			Organization: []string{"ByteSniff"},
		},
		NotBefore:             time.Now(),
		NotAfter:              time.Now().AddDate(10, 0, 0),
		KeyUsage:              x509.KeyUsageCRLSign | x509.KeyUsageDigitalSignature,
		ExtKeyUsage:           []x509.ExtKeyUsage{x509.ExtKeyUsageServerAuth},
		BasicConstraintsValid: true,
		IsCA:                  true,
	}

	certBytes, err := x509.CreateCertificate(rand.Reader, template, template, &key.PublicKey, key)
	if err != nil {
		return err
	}

	os.MkdirAll("certs", 0755)
	certFile, _ := os.Create(RootCAPath)
	pem.Encode(certFile, &pem.Block{Type: "CERTIFICATE", Bytes: certBytes})
	certFile.Close()

	keyFile, _ := os.Create(RootKeyPath)
	pem.Encode(keyFile, &pem.Block{Type: "RSA PRIVATE KEY", Bytes: x509.MarshalPKCS1PrivateKey(key)})
	keyFile.Close()

	rootCert, err = x509.ParseCertificate(certBytes)
	rootKey = key
	return nil
}

func loadCA() error {
	certPEM, err := os.ReadFile(RootCAPath)
	if err != nil {
		return err
	}

	keyPEM, err := os.ReadFile(RootKeyPath)
	if err != nil {
		return err
	}

	block, _ := pem.Decode(certPEM)
	if block == nil {
		return errors.New("FAILED TO DECODE ROOT CERT PEM")
	}

	rootCert, err = x509.ParseCertificate(block.Bytes)
	if err != nil {
		return err
	}

	keyBlock, _ := pem.Decode(keyPEM)
	if keyBlock == nil {
		return errors.New("FAILED TO DECODE ROOT KEY PEM")
	}

	rootKey, err = x509.ParsePKCS1PrivateKey(keyBlock.Bytes)
	return err
}

func GetCA() (*x509.Certificate, *rsa.PrivateKey) {
	return rootCert, rootKey
}
