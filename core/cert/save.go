package cert

import (
	"os"
	"path/filepath"
)

func SaveLeaf(host string, certPEM, keyPEM []byte) error {
	dir := "certs/leaf"
	os.MkdirAll(dir, 0755)

	certPath := filepath.Join(dir, host+".pem")
	keyPath := filepath.Join(dir, host+".key")

	if err := os.WriteFile(certPath, certPEM, 0644); err != nil {
		return err
	}
	if err := os.WriteFile(keyPath, keyPEM, 0600); err != nil {
		return err
	}

	return nil
}
